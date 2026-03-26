import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// สมมติว่าเป็นข้อมูลที่ดึงมาจาก API (พิกัดตัวอย่างในจังหวัดเพชรบูรณ์)
const propertyData = [
  { id: 1, name: 'โครงการธาราวิล (เฟส 1)', lat: 16.4331, lng: 101.1444, price: '2.5 ล้านบาท', detail: 'บ้านคุณภาพ พร้อมอยู่' },
  { id: 2, name: 'Sompong Construction (สำนักงานใหญ่)', lat: 16.4450, lng: 101.1520, price: '-', detail: 'ติดต่อรับเหมาก่อสร้าง' },
];

const RealEstateMap = () => {
  const centerPosition = [16.4390, 101.1480]; // จุดศูนย์กลางแผนที่

  return (
    <MapContainer center={centerPosition} zoom={13} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* วนลูปข้อมูลเพื่อสร้าง Marker หลายๆ จุด */}
      {propertyData.map((property) => (
        <Marker key={property.id} position={[property.lat, property.lng]}>
          <Popup>
            <div style={{ fontFamily: 'sans-serif' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{property.name}</h3>
              <p style={{ margin: 0, color: 'gray' }}>{property.detail}</p>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#2ecc71' }}>
                {property.price}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RealEstateMap;