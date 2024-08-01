import { LoaderCircle } from "lucide-react";

export default function LoadingHome() {
  return (
    <div className="flex justify-center mt-10">
      <LoaderCircle className="animate-spin" size = {32}/>
    </div>
  );
}
