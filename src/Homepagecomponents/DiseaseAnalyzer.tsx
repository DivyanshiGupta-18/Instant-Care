import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Upload } from "lucide-react";

const DiseaseAnalyzer = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = () => {
    alert("Analyzing the disease... (This will be connected to AI in future)");
  };

  return (
    <section className="disease-analyzer text-center">
      <div className="container">
        <h2 className="mb-4">Upload a Disease Image</h2>
        <p className="text-muted">Get AI-based insights on health conditions</p>

        <Card className="p-4 shadow-sm border-0">
          <Form.Group>
            <Form.Label className="btn" style={{background: "linear-gradient(135deg, #693382, #0D7C66)", color: "#FFFFFF"}}>
              <Upload size={20} className="me-2" />
              Choose Image
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </Form.Label>
          </Form.Group>

          {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="Uploaded preview"
                className="img-fluid rounded"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}

          <Button
            className="mt-3 px-4"
            style={{backgroundColor :"#B2A5FF", color: "#FFFFFF"}}
            disabled={!image}
            onClick={handleAnalyze}
          >
            Analyze
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default DiseaseAnalyzer;
