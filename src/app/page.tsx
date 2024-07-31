import Timetable from "@/components/Timetable";
import { getGroup } from "@/actions/users";
import { LoaderCircle } from "lucide-react";

export default async function Home() {
  const { ok, group } = await getGroup();

  if (!ok || !group) {
    return <h1>User group not found!</h1>;
  }
  return (
    <div className="p-2">
      <Timetable group={group} />
    </div>
  );
}
