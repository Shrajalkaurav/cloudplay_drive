import { data } from "@/data/files";
import Card from "@/components/Card";
import Sort from "@/components/Sort";
import React from "react";
const Page = async ({ params }: any) => {
  const type = (await params)?.type as string;
  const files = data;
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
            .filter((file) => file.type === type)
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
