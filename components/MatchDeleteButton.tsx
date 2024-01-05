import { useMatches } from "./matchesContext";


function MatchDeleteButton({ id }: { id: string }) {
    const { fetchMatches } = useMatches();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/matches/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log("match deleted");
          await fetchMatches();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return <button onClick={handleDelete}>DELETE</button>;
}
export default MatchDeleteButton;
