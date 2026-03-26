
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ProjectLocation() {

const propertyData = [
  { id: 1, name: 'โครงการธาราวิล (เฟส 1)', lat: 16.4331, lng: 101.1444, price: '2.5 ล้านบาท', detail: 'บ้านคุณภาพ พร้อมอยู่' },
  { id: 2, name: 'Sompong Construction (สำนักงานใหญ่)', lat: 16.4450, lng: 101.1520, price: '-', detail: 'ติดต่อรับเหมาก่อสร้าง' },
];

  const centerPosition = [16.4390, 101.1480]; // จุดศูนย์กลางแผนที่

    return (
        <div className='w-full bg-brand py-10'>
            <p className='text-3xl font-medium text-center mb-10 text-white text-shadow-xs'>ตำแหน่งโครงการทั้งหมด</p>
            <div className="mx-auto bg-white w-220 h-90 rounded-3xl ">
                <MapContainer center={centerPosition} zoom={13} style={{ height: "100%", width: "100%" ,zIndex:0}}>
                      <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
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
            </div>
        </div>
    )
}


export default ProjectLocation