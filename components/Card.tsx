import Link from "next/link";
import React from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";

interface FileProps {
  id: number;
  title: string;
  url: string;
  type: string;
  extension: string;
  size: number;
  createdAt: string;
  owner: string;
}
const Card = ({ file }: { file: FileProps }) => {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          ...
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.title}</p>
        <FormattedDateTime
          date={file.createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-100">By: {file.owner}</p>
      </div>
    </Link>
  );
};
export default Card;
