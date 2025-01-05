type ViewMoreBtnProps = {
  game: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function ViewMoreBtn({ game, onClick }: ViewMoreBtnProps) {
  return (
    <div className="text-center py-4">
      <button
        className={game === "mw3" ? "load-more-btn" : "load-more-btn-bo6"}
        onClick={onClick}
      >
        View More!
      </button>
    </div>
  );
}
export default ViewMoreBtn;
