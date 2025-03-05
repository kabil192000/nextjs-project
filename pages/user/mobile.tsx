import { useState, useEffect, FormEvent } from 'react';
import UsersHeaderFile from '@/app/components/UsersHeaderFile';
import FooterNJ from '@/app/components/FooterNJ';
const apiUrl = '/api/mobiles';
import { Button, Card } from 'react-bootstrap';

interface Mobile {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image_url: string;
  stock_quantity: number;
}

export default function Mobiles() {
  const [mobiles, setMobiles] = useState<Mobile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newMobile, setNewMobile] = useState<Mobile>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    image_url: '',
    stock_quantity: 0
  });

  const [editingMobile, setEditingMobile] = useState<Mobile | null>(null);

  const fetchMobiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const data: Mobile[] = await res.json();
      setMobiles(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch mobiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

  const createMobile = async (e: FormEvent) => {
    e.preventDefault();
   
    if (!newMobile.image_url || !isValidUrl(newMobile.image_url)) {
      setError('Please provide a valid image URL');
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMobile),
      });
      const result = await res.json();
      if (res.ok) {
        setNewMobile({
          id: 0,
          name: '',
          description: '',
          price: 0,
          category: '',
          brand: '',
          image_url: '',
          stock_quantity: 0,
        });
        fetchMobiles();
      } else {
        setError(result.error || 'Failed to create mobile');
      }
    } catch (err) {
      setError('Error creating mobile');
    }
  };

  const editMobile = async (id: number) => {
    const mobile = mobiles.find((item) => item.id === id);
    setEditingMobile(mobile || null);
  };

  const updateMobile = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingMobile) return;

    if (!editingMobile.image_url || !isValidUrl(editingMobile.image_url)) {
      setError('Please provide a valid image URL');
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingMobile),
      });
      const result = await res.json();
      if (res.ok) {
        fetchMobiles();
        setEditingMobile(null);
      } else {
        setError(result.error || 'Failed to update mobile');
      }
    } catch (err) {
      setError('Error updating mobile');
    }
  };

  const deleteMobile = async (id: number) => {
    if (confirm('Are you sure you want to delete this mobile?')) {
      try {
        const res = await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (res.ok) {
          fetchMobiles();
        } else {
          setError(result.error || 'Failed to delete mobile');
        }
      } catch (err) {
        setError('Error deleting mobile');
      }
    }
  };

  const isValidUrl = (url: string) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  const filteredMobiles = mobiles.filter((mobile) =>
    mobile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <UsersHeaderFile />
      <div className="container my-5">
        <h1 className="text-center">Mobile Management</h1>

        
        {error && <div className="alert alert-danger">{error}</div>}

       
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by mobile name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="create-button" variant="info" onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Close Create Form' : 'Open Create Form'}
      </Button>
      {showCreateForm &&(

        <div>
          <h2>{editingMobile ? 'Edit Mobile' : 'Add New Mobile'}</h2>
          <form onSubmit={editingMobile ? updateMobile : createMobile}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Mobile Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={editingMobile ? editingMobile.name : newMobile.name}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, name: e.target.value });
                  } else {
                    setNewMobile({ ...newMobile, name: e.target.value });
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={editingMobile ? editingMobile.description : newMobile.description}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, description: e.target.value });
                  } else {
                    setNewMobile({ ...newMobile, description: e.target.value });
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={editingMobile ? editingMobile.price : newMobile.price}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, price: Number(e.target.value) });
                  } else {
                    setNewMobile({ ...newMobile, price: Number(e.target.value) });
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={editingMobile ? editingMobile.category : newMobile.category}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, category: e.target.value });
                  } else {
                    setNewMobile({ ...newMobile, category: e.target.value });
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                value={editingMobile ? editingMobile.brand : newMobile.brand}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, brand: e.target.value });
                  } else {
                    setNewMobile({ ...newMobile, brand: e.target.value });
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock_quantity" className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                id="stock_quantity"
                value={editingMobile ? editingMobile.stock_quantity : newMobile.stock_quantity}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, stock_quantity: Number(e.target.value) });
                  } else {
                    setNewMobile({ ...newMobile, stock_quantity: Number(e.target.value) });
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image_url" className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="image_url"
                value={editingMobile ? editingMobile.image_url : newMobile.image_url}
                onChange={(e) => {
                  if (editingMobile) {
                    setEditingMobile({ ...editingMobile, image_url: e.target.value });
                  } else {
                    setNewMobile({ ...newMobile, image_url: e.target.value });
                  }
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingMobile ? 'Update Mobile' : 'Add Mobile'}
            </button>
          </form>
          
        </div>
      )}

        <div className="mt-4">
          <h2>Mobiles List</h2>
          <div className="row">
            {filteredMobiles.map((mobile) => (
              <div key={mobile.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card">
                  <img
                    src={mobile.image_url}
                    alt={mobile.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{mobile.name}</h5>
                    <p className="card-text">Price: ${mobile.price}</p>
                    <button className="btn btn-warning w-5" onClick={() => editMobile(mobile.id)}>Edit</button>
                    <button className="btn btn-danger mt-2" onClick={() => deleteMobile(mobile.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterNJ />
    </div>
     
    
  );
}
