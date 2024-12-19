import { useState, useEffect } from "react";
import axios from "axios";

function Ads({ user }) {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editAd, setEditAd] = useState(null); // Pour stocker l'annonce en cours de modification

  const token = localStorage.getItem("token");

  const fetchAds = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/ads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la récupération des annonces");
    }
  };

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line
  }, []);

  const createAd = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/api/ads",
        { title, description, price, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchAds();
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l'annonce");
    }
  };

  const updateAd = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/ads/${editAd._id}`,
        { title, description, price, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAds();
      setEditAd(null); // Fermer la modale après la mise à jour
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
    }
  };

  const deleteAd = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAds();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des Annonces</h2>
      {user && (
        <div className="card p-3 mb-4">
          <h3>Créer une nouvelle annonce</h3>
          <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Catégorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button className="btn btn-success" onClick={createAd}>
              Créer
            </button>
          </div>
        </div>
      )}
      {ads.map((ad) => (
        <div className="card mb-3" key={ad._id}>
          <div className="card-body">
            <h4 className="card-title">{ad.title}</h4>
            <p className="card-text">{ad.description}</p>
            <p>Prix: {ad.price}€</p>
            <p>Catégorie: {ad.category}</p>
            <p>Auteur: {ad.author?.username}</p>
            {user && (
              <>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => {
                    setEditAd(ad);
                    setTitle(ad.title);
                    setDescription(ad.description);
                    setPrice(ad.price);
                    setCategory(ad.category);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAd(ad._id)}
                >
                  Supprimer
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Modale de modification */}
      {editAd && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier l'Annonce</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditAd(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Titre"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Prix"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Catégorie"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={updateAd}>
                  Sauvegarder
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditAd(null)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ads;
