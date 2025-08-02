// Individual lunch items, can probably be reused for all lunchbox instances
const LunchItem = ({ name, image }) => {
    return (
        <div className="bg-beige h-20 text-center">
            <img src={image}></img>
            <p>{name}</p>
        </div>
    );
};

export default LunchItem;
