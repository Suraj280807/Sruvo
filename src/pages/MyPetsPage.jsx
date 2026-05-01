import { useState, useEffect } from 'react';
import { Edit, Plus, Shield, Syringe, Camera, FileText, PawPrint, Trash2 } from 'lucide-react';
import './MyPetsPage.css';

const pets = [
  {
    id: 1,
    name: 'Bruno',
    status: 'Active',
    breed: 'Golden Retriever',
    age: '2 Years',
    gender: 'Male',
    weight: '28 kg',
    dob: '15 Jan 2023',
    microchip: 'XXXX-XXXX-1234',
    emoji: '🐕',
    about: 'Bruno is a friendly and energetic dog who loves playing fetch and swimming. He\'s great with kids and other pets.',
    allergies: 'None',
    color: '#FFF3E0',
  },
  {
    id: 2,
    name: 'Luna',
    status: 'Active',
    breed: 'Persian Cat',
    age: '1 Year',
    gender: 'Female',
    weight: '4 kg',
    dob: '20 Mar 2024',
    microchip: 'XXXX-XXXX-5678',
    emoji: '🐈',
    about: 'Luna is a calm and affectionate cat who loves being petted and sitting by the window watching birds.',
    allergies: 'Fish-based food',
    color: '#F3E5F5',
  },
];


const vaccinations = [
  { name: 'Rabies Vaccine', date: '10 Jan 2025', due: '10 Jan 2026', status: 'Done' },
  { name: 'Distemper', date: '15 Mar 2025', due: '15 Mar 2026', status: 'Done' },
  { name: 'Parvovirus', date: '20 May 2025', due: '20 May 2026', status: 'Upcoming' },
  { name: 'Bordetella', date: null, due: '10 Jun 2025', status: 'Due' },
];

const medHistory = [
  { date: '18 May 2025', doctor: 'Dr. Anjali Sharma', clinic: 'PetCare Clinic', issue: 'Annual checkup', notes: 'All vitals normal. Weight within healthy range.' },
  { date: '10 Mar 2025', doctor: 'Dr. Rohan Verma', clinic: 'Happy Paws Vet', issue: 'Ear infection', notes: 'Prescribed ear drops for 7 days. Follow up in 2 weeks.' },
];

export default function MyPetsPage() {
  const [petList, setPetList] = useState(pets);
  const [selectedPet, setSelectedPet] = useState(petList[0] || null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(selectedPet ? {...selectedPet} : null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  useEffect(() => {
    if (selectedPet) {
      setEditData({...selectedPet});
      setIsEditing(false);
    }
  }, [selectedPet]);

  const handleSave = () => {
    if(!selectedPet) return;
    Object.assign(selectedPet, editData);
    setPetList([...petList]); // trigger re-render in sidebar
    setIsEditing(false);
  };

  const handleRemovePet = () => {
    if(window.confirm(`Are you sure you want to remove ${selectedPet.name}?`)) {
       const newList = petList.filter(p => p.id !== selectedPet.id);
       setPetList(newList);
       if (newList.length > 0) {
         setSelectedPet(newList[0]);
       } else {
         setSelectedPet(null);
       }
    }
  };

  if (!selectedPet) {
    return (
      <div className="pets-page fade-in" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
        <div style={{fontSize: 48, marginBottom: 16}}>🐾</div>
        <h2 style={{color: 'var(--text-dark)'}}>No pets found</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: 24}}>You don't have any pets listed yet.</p>
        <button className="btn btn-primary"><Plus size={16} /> Add New Pet</button>
      </div>
    );
  }

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <PawPrint size={14} /> },
    { key: 'medical', label: 'Medical History', icon: <FileText size={14} /> },
    { key: 'vaccination', label: 'Vaccination', icon: <Syringe size={14} /> },
    { key: 'gallery', label: 'Gallery', icon: <Camera size={14} /> },
  ];

  return (
    <div className="pets-page fade-in">
      {/* Header */}
      <div className="page-title-row">
        <div>
          <div className="page-breadcrumb">My Pet</div>
          <h1 className="page-title">{selectedPet.name}</h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button className="btn btn-primary btn-sm" onClick={handleSave}>Save Profile</button>
          ) : (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(true)}><Edit size={13} /> Edit Profile</button>
              <button className="btn btn-outline btn-sm" onClick={handleRemovePet} style={{borderColor: '#EF5350', color: '#EF5350'}}><Trash2 size={13} /> Remove</button>
            </>
          )}
          <button className="btn btn-primary btn-sm"><Plus size={13} /> Add Pet</button>
        </div>
      </div>

      <div className="pets-layout">
        {/* Left sidebar - pet list */}
        <div className="pets-list-col">
          <div className="pets-list-header">My Pets</div>
          {petList.map(p => (
            <div
              key={p.id}
              className={`pet-list-item ${selectedPet.id === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPet(p)}
              style={{ '--pet-color': p.color }}
            >
              <div className="pet-list-emoji">{p.emoji}</div>
              <div>
                <div className="pet-list-name">{p.name}</div>
                <div className="pet-list-breed">{p.breed}</div>
              </div>
              <span className="badge badge-green" style={{ marginLeft: 'auto', fontSize: 10 }}>{p.status}</span>
            </div>
          ))}
          <button className="add-pet-btn"><Plus size={16} /> Add New Pet</button>
        </div>

        {/* Main pet profile */}
        <div className="pet-profile-main">
          {/* Profile header */}
          <div className="pet-profile-header card">
            <div className="pet-profile-top">
              <div className="pet-profile-avatar" style={{ background: selectedPet.color }}>
                <span>{selectedPet.emoji}</span>
              </div>
              <div className="pet-profile-info">
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <input className="pet-profile-name" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} style={{border: '1px solid #eee', borderRadius: 4, padding: '2px 8px'}} />
                  ) : (
                    <h2 className="pet-profile-name">{selectedPet.name}</h2>
                  )}
                  <span className="badge badge-green">{selectedPet.status}</span>
                </div>
                <div className="pet-stats-grid">
                  <div className="pet-stat-item"><span className="pet-stat-icon">🐕</span><span className="pet-stat-label">Breed</span>{isEditing ? <input value={editData.breed} onChange={e=>setEditData({...editData, breed: e.target.value})} style={{width: '90px', fontSize: 12, padding: '2px 4px', border: '1px solid #eee'}} /> : <span className="pet-stat-val">{selectedPet.breed}</span>}</div>
                  <div className="pet-stat-item"><span className="pet-stat-icon">📅</span><span className="pet-stat-label">Age</span>{isEditing ? <input value={editData.age} onChange={e=>setEditData({...editData, age: e.target.value})} style={{width: '90px', fontSize: 12, padding: '2px 4px', border: '1px solid #eee'}} /> : <span className="pet-stat-val">{selectedPet.age}</span>}</div>
                  <div className="pet-stat-item"><span className="pet-stat-icon">⚥</span><span className="pet-stat-label">Gender</span>{isEditing ? <input value={editData.gender} onChange={e=>setEditData({...editData, gender: e.target.value})} style={{width: '90px', fontSize: 12, padding: '2px 4px', border: '1px solid #eee'}} /> : <span className="pet-stat-val">{selectedPet.gender}</span>}</div>
                  <div className="pet-stat-item"><span className="pet-stat-icon">⚖️</span><span className="pet-stat-label">Weight</span>{isEditing ? <input value={editData.weight} onChange={e=>setEditData({...editData, weight: e.target.value})} style={{width: '90px', fontSize: 12, padding: '2px 4px', border: '1px solid #eee'}} /> : <span className="pet-stat-val">{selectedPet.weight}</span>}</div>
                  <div className="pet-stat-item"><span className="pet-stat-icon">🎂</span><span className="pet-stat-label">DOB</span>{isEditing ? <input value={editData.dob} onChange={e=>setEditData({...editData, dob: e.target.value})} style={{width: '90px', fontSize: 12, padding: '2px 4px', border: '1px solid #eee'}} /> : <span className="pet-stat-val">{selectedPet.dob}</span>}</div>
                  <div className="pet-stat-item"><span className="pet-stat-icon">📱</span><span className="pet-stat-label">Microchip</span>{isEditing ? <input value={editData.microchip} onChange={e=>setEditData({...editData, microchip: e.target.value})} style={{width: '90px', fontSize: 12, padding: '2px 4px', border: '1px solid #eee'}} /> : <span className="pet-stat-val">{selectedPet.microchip}</span>}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="pet-tabs">
              {tabs.map(t => (
                <button
                  key={t.key}
                  className={`pet-tab ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === 'profile' && (
            <div className="pet-tab-content fade-in">
              <div className="grid-2">
                <div className="card">
                  <h3 className="card-section-title">About {selectedPet.name}</h3>
                  {isEditing ? (
                    <textarea style={{width:'100%', padding: '8px', border: '1px solid #eee', borderRadius: 6, fontSize: 13, resize: 'vertical'}} rows={4} value={editData.about} onChange={e => setEditData({...editData, about: e.target.value})} />
                  ) : (
                    <p className="pet-about-text">{selectedPet.about}</p>
                  )}
                </div>
                <div className="card">
                  <h3 className="card-section-title">Allergies</h3>
                  {isEditing ? (
                    <textarea style={{width:'100%', padding: '8px', border: '1px solid #eee', borderRadius: 6, fontSize: 13, resize: 'vertical'}} rows={4} value={editData.allergies} onChange={e => setEditData({...editData, allergies: e.target.value})} />
                  ) : (
                    <p className="pet-about-text">{selectedPet.allergies}</p>
                  )}
                </div>
              </div>
              <div className="card">
                <h3 className="card-section-title">Quick Actions</h3>
                <div className="quick-actions">
                  {[
                    { icon: '🩺', label: 'Add Medical Record' },
                    { icon: '💉', label: 'Schedule Vaccination' },
                    { icon: '✂️', label: 'Book Grooming' },
                    { icon: '📝', label: 'Add Note' },
                  ].map((a, i) => (
                    <button key={i} className="quick-action-btn">
                      <span className="qa-icon">{a.icon}</span>
                      <span>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vaccination' && (
            <div className="pet-tab-content fade-in">
              <div className="card">
                <h3 className="card-section-title">Vaccination Records</h3>
                <div className="vacc-list">
                  {vaccinations.map((v, i) => (
                    <div key={i} className="vacc-item">
                      <div className="vacc-icon">
                        <Shield size={16} color={v.status === 'Done' ? '#1B8B3B' : v.status === 'Due' ? '#EF5350' : '#FFA726'} />
                      </div>
                      <div className="vacc-info">
                        <div className="vacc-name">{v.name}</div>
                        <div className="vacc-dates">
                          {v.date && <span>Given: {v.date}</span>}
                          <span>Due: {v.due}</span>
                        </div>
                      </div>
                      <span className={`badge ${v.status === 'Done' ? 'badge-green' : v.status === 'Due' ? 'badge-red' : 'badge-orange'}`}>
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="pet-tab-content fade-in">
              <div className="card">
                <h3 className="card-section-title">Medical History</h3>
                <div className="med-timeline">
                  {medHistory.map((m, i) => (
                    <div key={i} className="med-item">
                      <div className="med-date-col">
                        <div className="med-date">{m.date}</div>
                      </div>
                      <div className="med-dot" />
                      <div className="med-content card card-sm">
                        <div className="med-top">
                          <div>
                            <div className="med-issue">{m.issue}</div>
                            <div className="med-doctor">{m.doctor} · {m.clinic}</div>
                          </div>
                        </div>
                        <p className="med-notes">{m.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="pet-tab-content fade-in">
              <div className="card">
                <h3 className="card-section-title">Photo Gallery</h3>
                <div className="gallery-grid">
                  {uploadedPhotos.map((url, i) => (
                    <div key={'up-'+i} className="gallery-item" style={{padding: 0, overflow: 'hidden'}}>
                      <img src={url} alt="pet photo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="gallery-item">
                      <span style={{ fontSize: 36 }}>{selectedPet.emoji}</span>
                    </div>
                  ))}
                  <label className="gallery-item gallery-add" style={{cursor: 'pointer'}}>
                    <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        setUploadedPhotos([...uploadedPhotos, URL.createObjectURL(e.target.files[0])]);
                      }
                    }} />
                    <Plus size={24} color="var(--text-muted)" />
                    <span>Add Photo</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
