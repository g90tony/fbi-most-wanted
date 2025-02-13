import CategoriesList from "@/components/custom/wantedCategoriesList ";

export default function WantedPersonsCategoriesPage() {
  return (
    <section className="flex flex-col w-full min-h-[90vh] gap-4 overflow-y-auto">
      <CategoriesList />
    </section>
  );
}
