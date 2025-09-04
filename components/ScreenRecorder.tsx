"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, VideoOff, Download } from "lucide-react";

export default function ScreenRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing screen:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Screen Recorder
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-4">
        {!recording ? (
          <Button onClick={startRecording} className="gap-2">
            <Video className="h-5 w-5" />
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            className="gap-2"
          >
            <VideoOff className="h-5 w-5" />
            Stop Recording
          </Button>
        )}

        {videoUrl && (
          <div className="w-full flex flex-col items-center mt-4 space-y-2">
            <h2 className="text-lg font-semibold">Recorded Video</h2>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-xl border"
            />
            <a
              href={videoUrl}
              download="recording.webm"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Download className="h-4 w-4" />
              Download Video
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
