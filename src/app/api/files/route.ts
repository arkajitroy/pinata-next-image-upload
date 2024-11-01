import { pinata } from "@/lib/pinata-config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    const uploadData = await pinata.upload.file(file);

    // Returning Image Response + with signedURL (CDN) + optimizing
    const imageInstance = await pinata.gateways
      .createSignedURL({
        cid: uploadData.cid,
        expires: 3600,
      })
      .optimizeImage({
        width: 650,
        format: "webp",
      });

    return NextResponse.json(
      { message: "Successfully file uploaded", imageURL: imageInstance },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error!" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = (await pinata.files.list()).files;

    const imageInstances = await Promise.all(
      response.map(async (image) => {
        return await pinata.gateways
          .createSignedURL({
            cid: image.cid,
            expires: 3600,
          })
          .optimizeImage({
            width: 650,
            format: "webp",
          });
      })
    );

    return NextResponse.json(
      { message: "Successfully fetched images", data: imageInstances },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error!" }, { status: 500 });
  }
}
