// Individual lunch items, can probably be reused for all lunchbox instances
const LunchItem = ({ name, image }) => {
    return (
        <div className="bg-beige h-35 text-center p-2 flex flex-col justify-between">
            <img src={image} className="inline-block h-16 mt-4"></img>
            <p>{name}</p>
        </div>
    );
};

export default LunchItem;
