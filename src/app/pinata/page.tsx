"use client";
import { pinataClient } from "@/lib/pinata";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PinataPage() {
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const urlRequest = await fetch("/api/url"); // Fetches the temporary upload URL
      const urlResponse = await urlRequest.json(); // Parse response
      const upload = await pinataClient.upload.public
        .file(file)
        .url(urlResponse.url); // Upload the file with the signed URL
      console.log(upload);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const fetchFile = async () => {
    const { data, contentType } = await pinataClient.gateways.public.get(
      "bafybeibq6e2nto7moj3rpyqqjyohduemynrs7qu7uzyha6ymefos7p4mx4"
    );
    console.log(data, contentType);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Pinata Upload with Payment (Axios)
      </h1>
      <div>
        {" "}
        <input type="file" onChange={handleChange} />
        <button type="button" disabled={uploading} onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <iframe
          src="http://localhost:3001/chat.html"
          width="100%"
          height="400px"
          // style="border: none;"
        ></iframe>
      </div>
      <button onClick={fetchFile}>Retrieve</button>
    </main>
  );
}
