// Individual lunch items, can probably be reused for all lunchbox instances
const LunchItem = ({ name, image, onClick }) => {
    return (
        <div
            className="bg-beige h-35 text-center p-2 flex flex-col justify-between cursor-pointer hover:bg-beige-darker transition-colors"
            onClick={onClick}
        >
            <img src={image} className="inline-block h-16 mt-4"></img>
            <p>{name}</p>
        </div>
    );
};

export default LunchItem;
