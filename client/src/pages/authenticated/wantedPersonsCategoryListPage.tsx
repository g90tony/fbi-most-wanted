import WantedList from "@/components/custom/wantedList";

export default function WantedPersonsCategoryListPage() {
  return (
    <section className="flex flex-col w-full min-h-[90vh] gap-4 overflow-y-auto p-0 m-0">
      <WantedList type="categorized" />
    </section>
  );
}
