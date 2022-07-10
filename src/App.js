import "./App.css";
import { YMaps, Map, Placemark, Clusterer } from "react-yandex-maps";
import { useEffect, useState } from "react";

const allMarks = [
  {
    coordinates: [55.684758, 37.738521],
    properties: {
      iconContent: "К",
      balloonContent: "Красная метка",
      hintContent: "hint content",
    },
    options: { iconColor: "red" },
  },
  {
    properties: { iconContent: "З", clusterCaption: "Geo object №1" },
    coordinates: [57.684758, 39.738521],
    options: { iconColor: "green" },
  },
  { coordinates: [55.45, 37.51], options: { iconColor: "blue" } },
  {
    coordinates: [54.684758, 32.5521],
    properties: { iconContent: "Ч" },
    options: { iconColor: "black" },
  },
  { coordinates: [55.1111, 36.53521], options: { iconColor: "blue" } },
  { coordinates: [61.26262, 33.525], options: { iconColor: "blue" } },
  {
    properties: { iconContent: "З", clusterCaption: "Geo object №1" },
    coordinates: [53.444, 35.3533],
    options: { iconColor: "green" },
  },
  {
    coordinates: [54.444, 38.3533],
    properties: { iconContent: "Ч" },
    options: { iconColor: "black", preset: "islands#circleIcon" },
  },
  { coordinates: [54.444, 31.3533], options: { iconColor: "blue" } },
  {
    coordinates: [56.444, 35.15233],
    properties: { iconContent: "Ч" },
    options: { iconColor: "black" },
  },
  {
    coordinates: [52.5151, 42.3623],
    properties: {
      iconContent: "К",
      hintContent: "Это хинт",
      balloonContent:'<div class="balloon">custom balloon </div>',
    },
    options: {
      iconColor: "red",
      preset: "islands#circleIcon",
    },
  },
  { coordinates: [56, 43], options: { iconColor: "blue" } },
];

function App() {
  const [marks, setMarks] = useState([]);
  const [filters, setFilters] = useState(["red", "green", "blue", "black"]);

  const filterMarks = (color) => {
    if (filters?.includes(color)) {
      setFilters(filters?.filter((i) => i !== color));
    } else {
      setFilters([...filters, color]);
    }
  };

  useEffect(() => {
    setMarks(allMarks?.filter((i) => filters.includes(i.options.iconColor)));
    console.log(allMarks?.filter((i) => filters.includes(i.options.iconColor)));
  }, [filters]);

  useEffect(() => {}, [marks]);

  // const myMap = new YMaps()

  // const balloon = new YMaps.Balloon(YMaps);
  return (
    <div className="App">
      <YMaps balloonContent="boba">
        <div>
          <Map
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            balloonContent="b"
            style={{ width: "800px", height: "800px" }}
            defaultState={{ center: [55.75, 37.57], zoom: 6 }}
          >
            <Clusterer>
              {marks?.length > 0 &&
                marks.map((mark) => (
                  <Placemark
                    key={`${mark.coordinates[0]}${mark.coordinates[1]}`}
                    geometry={mark.coordinates}
                    properties={mark.properties}
                    options={mark.options}
                  />
                ))}
            </Clusterer>
          </Map>
        </div>
      </YMaps>
      <div className="checkboxList">
        <div className="filterItem">
          <input
            type="checkbox"
            id="red"
            checked={filters.includes("red")}
            onChange={() => filterMarks("red")}
          />
          <label for="red">Красные</label>
        </div>
        <div className="filterItem">
          <input
            type="checkbox"
            id="green"
            checked={filters.includes("green")}
            onChange={() => filterMarks("green")}
          />
          <label for="green">Зеленые</label>
        </div>
        <div className="filterItem">
          <input
            type="checkbox"
            id="black"
            checked={filters.includes("black")}
            onChange={() => filterMarks("black")}
          />
          <label for="black">Черные</label>
        </div>
        <div className="filterItem">
          <input
            type="checkbox"
            id="blue"
            checked={filters.includes("blue")}
            onChange={() => filterMarks("blue")}
          />
          <label for="blue">Синие</label>
        </div>
        <div >
          Кастомный балун на красной метке в правом нижнем углу
        </div>
      </div>
    </div>
  );
}

export default App;
