import { useSelector } from 'react-redux';

import { getMapMarkersData } from 'src/reducers/map';

const Sidebar = () => {
  const mapMarkersData = useSelector(getMapMarkersData);

  return (
    <div>
      {
        mapMarkersData.map((item) => {
          return (
            <div style={{ margin: 20, padding: 10, backgroundColor: 'beige' }}>
              {item}
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar;
