import dynamic from "next/dynamic";

const DetailPage = dynamic(
  () => import("@/components/screen/DetailPage"),
  {
    ssr: false,
  }
);

export default DetailPage;