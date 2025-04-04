// import React, { useState } from "react";
// import axios from "axios";

// const AyurvedicTreatment = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const apiKey = 'AIzaSyB4OPrYOlBCIC3Gl66vZ7Aj3hYJsCaNH1I';

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       setError("Please enter a search query.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: searchQuery,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const result = response.data.candidates[0].content.parts[0].text;
//       setSearchResults(result);
//     } catch (err) {
//       setError("Failed to fetch Ayurvedic treatment details. Please try again.");
//       console.error(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-4 mt-5">
//       <h1 className="text-center mb-4">Ayurvedic Treatment</h1>
//       <p className="lead text-center">
//         Discover the ancient wisdom of Ayurveda for holistic healing and well-being.
//       </p>

//       <div className="row">
//         <div className="col-md-4 mb-4">
//           <div className="card">
//             <img
//               src="https://samwarthika.com/articles/wp-content/uploads/2023/08/blog-image-ayurveda-treatment-in-singapore.jpg"
//               className="card-img-top"
//               alt="Panchakarma Therapy"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Panchakarma Therapy</h5>
//               <p className="card-text">
//                 It offers a wealth of natural curative methods intended for the betterment of humanity. Among its various branches, Panchakarma stands out as particularly prominent.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card">
//             <img
//               src="https://media.post.rvohealth.io/wp-content/uploads/2024/02/Ayurvedic-header.jpg"
//               className="card-img-top"
//               alt="Ayurvedic Herbs and Spices"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Ayurvedic Herbs and Spices</h5>
//               <p className="card-text">
//                 Ayurveda is a traditional Indian system of medicine. It aims to preserve health and wellness by keeping the mind, body, and spirit in balance and preventing disease rather than treating it.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4 mb-4">
//           <div className="card">
//             <img
//               src="https://atmabodhwellness.com/wp-content/uploads/2023/11/image-3-1024x576.png"
//               className="card-img-top"
//               alt="Shirodhara Treatment"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Shirodhara Treatment</h5>
//               <p className="card-text">
//                 Shirodhara involves the application of oil to the forehead and scalp, constituting a remarkable body cleansing therapy coupled with a relaxation procedure.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Additional Content */}
//       <div className="mt-5">
//         <h2>About Ayurvedic Treatments</h2>
//         <p>
//           Ayurveda is a 5,000-year-old system of natural healing that originated in India. It focuses on balancing the mind, body, and spirit through personalized treatments, herbal remedies, and lifestyle changes.
//         </p>
//         <p>
//           Our Ayurvedic therapies are designed to detoxify, rejuvenate, and restore harmony to your life.
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="mt-5">
//         <h2>Search for Ayurvedic Treatments</h2>
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             style={{marginRight : "24px"}}
//             placeholder="Enter a treatment or herb name..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button
//             className="btn"
//             style={{backgroundColor : "#693382", color : "#FFFFFF"}}
//             onClick={handleSearch}
//             disabled={loading}
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>

//         {/* Display Search Results in a Card */}
//         {error && <div className="alert alert-danger">{error}</div>}
//         {searchResults && (
//           <div className="card mt-3">
//             <div className="card-body">
//               <h3 className="card-title">Search Results</h3>
//               <p className="card-text">{searchResults}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AyurvedicTreatment;




import React, { useState } from "react";
import axios from "axios";
import "./AyurvedicTreatment.css";

const AyurvedicTreatment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = 'AIzaSyB4OPrYOlBCIC3Gl66vZ7Aj3hYJsCaNH1I';

  const processApiResponse = (text) => {
    // Split the text into sections based on common patterns
    const sections = text.split(/\n\n+/);
    
    return {
      title: sections[0]?.trim() || "Treatment Information",
      description: sections[1]?.trim() || "",
      benefits: sections.find(s => s.toLowerCase().includes("benefit"))?.split("\n").filter(line => line.trim()) || [],
      usage: sections.find(s => s.toLowerCase().includes("use") || s.toLowerCase().includes("how to"))?.split("\n").filter(line => line.trim()) || [],
      precautions: sections.find(s => s.toLowerCase().includes("precaution") || s.toLowerCase().includes("warning"))?.split("\n").filter(line => line.trim()) || [],
      additionalInfo: sections.slice(-1)[0]?.trim() || ""
    };
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Provide detailed information about the Ayurvedic treatment or herb: ${searchQuery}. 
                  Include the following sections:
                  - Brief description
                  - Key benefits
                  - How to use
                  - Precautions and warnings
                  - Additional information`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data.candidates[0].content.parts[0].text;
      const processedResults = processApiResponse(result);
      setSearchResults(processedResults);
    } catch (err) {
      setError("Failed to fetch Ayurvedic treatment details. Please try again.");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 mt-5">
      <h1 className="text-center mb-4">Ayurvedic Treatment</h1>
      <p className="lead text-center">
        Discover the ancient wisdom of Ayurveda for holistic healing and well-being.
      </p>

      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card treatment-card">
            <img
              src="https://samwarthika.com/articles/wp-content/uploads/2023/08/blog-image-ayurveda-treatment-in-singapore.jpg"
              className="card-img-top"
              alt="Panchakarma Therapy"
            />
            <div className="card-body">
              <h5 className="card-title">Panchakarma Therapy</h5>
              <p className="card-text">
                It offers a wealth of natural curative methods intended for the betterment of humanity. Among its various branches, Panchakarma stands out as particularly prominent.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <div className="card treatment-card">
            <img
              src="https://media.post.rvohealth.io/wp-content/uploads/2024/02/Ayurvedic-header.jpg"
              className="card-img-top"
              alt="Ayurvedic Herbs and Spices"
            />
            <div className="card-body">
              <h5 className="card-title">Ayurvedic Herbs and Spices</h5>
              <p className="card-text">
                Ayurveda is a traditional Indian system of medicine. It aims to preserve health and wellness by keeping the mind, body, and spirit in balance and preventing disease rather than treating it.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-4">
          <div className="card treatment-card">
            <img
              src="https://atmabodhwellness.com/wp-content/uploads/2023/11/image-3-1024x576.png"
              className="card-img-top"
              alt="Shirodhara Treatment"
            />
            <div className="card-body">
              <h5 className="card-title">Shirodhara Treatment</h5>
              <p className="card-text">
                Shirodhara involves the application of oil to the forehead and scalp, constituting a remarkable body cleansing therapy coupled with a relaxation procedure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section mt-5">
        <h2>Search for Ayurvedic Treatments</h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter a treatment or herb name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* Search Results */}
        {searchResults && !loading && (
          <div className="results-container mt-4">
            <h3 className="results-title">{searchResults.title}</h3>
            
            {searchResults.description && (
              <div className="result-section">
                <h4>Description</h4>
                <p>{searchResults.description}</p>
              </div>
            )}

            {searchResults.benefits.length > 0 && (
              <div className="result-section">
                <h4>Key Benefits</h4>
                <ul className="benefits-list">
                  {searchResults.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {searchResults.usage.length > 0 && (
              <div className="result-section">
                <h4>How to Use</h4>
                <ul className="usage-list">
                  {searchResults.usage.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            {searchResults.precautions.length > 0 && (
              <div className="result-section">
                <h4>Precautions & Warnings</h4>
                <ul className="precautions-list">
                  {searchResults.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))}
                </ul>
              </div>
            )}

            {searchResults.additionalInfo && (
              <div className="result-section">
                <h4>Additional Information</h4>
                <p>{searchResults.additionalInfo}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AyurvedicTreatment;