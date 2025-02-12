import CategoriesCategoryList from "@/components/custom/categoriesWantedList ";

export default function WantedPersonsCategoriesPage() {
  return (
    <section className="flex flex-col w-full min-h-[90vh] gap-4 overflow-y-auto">
      <CategoriesCategoryList />
    </section>
  );
}
