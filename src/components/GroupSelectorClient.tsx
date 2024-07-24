"use client";
import { useState } from "react";
import { GroupSelector } from "./GroupSelector";
import { useMutation } from "@tanstack/react-query";
import { updateUserWithGroup } from "@/actions/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

export function GroupSelectorClient({ data }: { data: { name: string }[] }) {
  const [selectedGroup, setSelectedGroup] = useState("");
  const router = useRouter();

  function handleGroupSelect(value: string) {
    setSelectedGroup(value);
  }

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async () => {
      const data = await updateUserWithGroup(selectedGroup);
      if (!data.ok) {
        throw new Error("operation failed");
      }
    },
    onSuccess: () => {
      toast.success("Hell yeah! user created");
      router.push("/");
    },
    onError: (err) => {
			console.log(err)
      toast.error("Hell nah! error");
    },
  });
  return (
    <div className="flex flex-col items-center">
      <GroupSelector
        value={selectedGroup}
        data={data}
        onGroupSelect={handleGroupSelect}
      />
      <button
        className="px-4 py-2 rounded-md bg-purple-200 mt-5"
        onClick={() => {
          handleSubmit();
        }}
      >
        <div>
          {isPending && <LoaderCircle className="animate-spin" />}
					{!isPending && <p>Submit</p>}
        </div>
      </button>
    </div>
  );
}
