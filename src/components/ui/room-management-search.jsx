import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function RoomManageSearch({ onSearch }) {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push("/agent/roomproperty/createRoom");
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="h-justify-between flex h-20 w-full items-center border-b p-4">
      <h1 className="flex-grow px-6 text-xl font-semibold">Room Management</h1>
      <div className="ml-auto flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[300px] pl-10"
            onChange={handleSearchChange}
          />
        </div>
        <Button
          className="bg-[#C14817] hover:bg-[#A13807]"
          onClick={handleCreateRoom}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Room
        </Button>
      </div>
    </div>
  );
}
