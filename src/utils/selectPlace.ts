import Place from "../entities/Place";

const randomInt = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min
)

const selectPlace = async () => {
  const places = await Place.find({
    isTaken: false
  })

  let starNum = 0;

  places.forEach(place => {
    starNum = starNum + place.star;
  })

  let ran = await randomInt(0, starNum-1);

  const result = places.find(place => {
    ran = ran - place.star;
    return (ran<0)
  })

  console.log(result);
  
  return result;
}

export default selectPlace;