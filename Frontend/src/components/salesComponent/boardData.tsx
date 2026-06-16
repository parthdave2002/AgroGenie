import { MdPictureAsPdf, MdOutlineTextSnippet, MdVideoLibrary, MdImage, MdPlayCircleFilled } from "react-icons/md";

interface BoardData {
  _id: string;
  name: string;
  document_pics?: string;
  document_text?: string;
  type_document: string;
}

interface Props {
  BoardDataList: BoardData[];
  ViweAllCall: (type: string) => void;
}

export default function BoardSection({ BoardDataList, ViweAllCall }: Props) {
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <MdPictureAsPdf className="text-red-600 w-10 h-10" />;
      case "image":
        return <MdImage className="text-blue-600 w-10 h-10" />;
      case "video":
        return <MdVideoLibrary className="text-purple-600 w-10 h-10" />;
      case "youtube":
        return <MdPlayCircleFilled className="text-red-500 w-10 h-10" />;
      case "text":
        return <MdOutlineTextSnippet className="text-green-600 w-10 h-10" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {BoardDataList && BoardDataList.length ? (
        <div className="bg-White dark:bg-DarkBackground rounded-xl py-4 px-6 w-[22rem] shadow-md">
   <div className="text-[1.4rem] font-semibold text-DarkBackground dark:text-WhiteMarble">  Notice Board </div>
          <div className="space-y-3">
            {BoardDataList.map((item) => (
              <div  key={item._id} className="flex items-center justify-between bg-White dark:bg-Cosmos hover:bg-TitaniumWhite dark:hover:bg-TranquilBlack transition p-3 rounded-lg cursor-pointer"  onClick={() =>  item.type_document === "text" ? null : openInNewTab(item?.document_pics || item?.document_text || "")}>
                <div className="flex items-center space-x-3">
                  {renderIcon(item.type_document)}
                  <div>
                    <p className="text-DarkBackground dark:text-TitaniumWhite font-medium">  {item.name}  </p>
                    {item.type_document === "text" && (
                      <p className="text-SharkGray text-sm"> {item.document_text || "No text content"}   </p>
                    )}
                  </div>
                </div>

                {item.type_document !== "text" && (
                  <svg  className="w-5 h-5 text-SilverSteel"   fill="none" stroke="currentColor"  strokeWidth={2} viewBox="0 0 24 24">
                    <path  strokeLinecap="round"  strokeLinejoin="round"   d="M9 5l7 7-7 7"   />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
