import Card from "@/components/Card";
import Sort from "@/components/Sort";
import React from "react";
const Page = async ({ params }: any) => {
  const type = (await params)?.type as string;
  const files = {
    total: 2,
    documents: [
      {
        id: 1,
        title: "Shingeki ni kyojin",
        url: "######",
        type: "media",
        extension: "mkv",
        size: 2699999996,
        createdAt: "2024-02-27",
        owner: {
          fullName: "Eren Yaegar",
        },
      },
      {
        id: 2,
        title: "Kimi no nawa",
        url: "######",
        type: "media",
        extension: "mkv",
        size: 1399999996,
        createdAt: "2024-02-29",
        owner: {
          fullName: "Levi ackerman",
        },
      },
      {
        id: 3,
        title: "One Piece Chapter-35",
        url: "######",
        type: "document",
        extension: "pdf",
        size: 322026,
        createdAt: "2024-02-29",
        owner: {
          fullName: "Gojo Satoru",
        },
      },
      {
        id: 4,
        title: "Gojo Wallpaper",
        url: "######",
        type: "image",
        extension: "png",
        size: 1026999,
        createdAt: "2024-02-29",
        owner: {
          fullName: "Roronoa Zoro",
        },
      },
    ],
  };
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total : <span className="h5">0Mb</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents
            .filter((file) => (file.type === type) | "")
            .map((file) => (
              <Card key={file.id} file={file} />
            ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
