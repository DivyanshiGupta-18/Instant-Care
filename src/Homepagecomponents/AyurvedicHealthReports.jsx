import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Search } from 'lucide-react';
import './AyurvedicHealthReports.css';

function AyurvedicHealthReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = 'AIzaSyB4OPrYOlBCIC3Gl66vZ7Aj3hYJsCaNH1I';

  const fetchGeminiResponse = async (prompt) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching from Gemini:', error);
      throw error;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // Structured prompts to get markdown formatted responses
      const doshaPrompt = `Analyze the following health condition: "${searchQuery}" from an Ayurvedic perspective.
Format your response in markdown with the following structure:
## Dosha Analysis

### Vata Imbalance
- **Symptoms:** [relevant symptoms]
- **Mental State:** [mental effects]
- **Treatment Focus:** [treatment approach]

### Pitta Imbalance
- **Physical Signs:** [relevant signs]
- **Sensations:** [relevant sensations]
- **Treatment Approach:** [treatment approach]

### Kapha Imbalance
- **Characteristics:** [relevant characteristics]
- **Physical Signs:** [relevant signs]
- **Treatment Goals:** [treatment goals]`;

      const dietPrompt = `Provide dietary recommendations for the condition: "${searchQuery}" from an Ayurvedic perspective.
Format your response in markdown with the following structure:
## Dietary Guidance

### Essential Guidelines
- **Fruits & Vegetables:** [specific recommendations]
- **Whole Grains:** [specific recommendations]
- **Protein Sources:** [specific recommendations]

### Specific Recommendations
1. **Healthy Fats**
   - [recommendation 1]
   - [recommendation 2]
   - [recommendation 3]

2. **Foods to Minimize**
   - [food 1]
   - [food 2]
   - [food 3]`;

      const lifestylePrompt = `Provide lifestyle recommendations for the condition: "${searchQuery}" from an Ayurvedic perspective.
Format your response in markdown with the following structure:
## Lifestyle Tips

### Daily Practices
1. **Diet**
   - [recommendation 1]
   - [recommendation 2]
   - [recommendation 3]

2. **Exercise**
   - [recommendation 1]
   - [recommendation 2]
   - [recommendation 3]

3. **Stress Management**
   - [recommendation 1]
   - [recommendation 2]
   - [recommendation 3]

### Important Routines
- **Sleep:** [sleep recommendations]
- **Monitoring:** [monitoring recommendations]
- **Medication:** [medication guidelines]
- **Follow-ups:** [follow-up recommendations]`;

      const [doshaAnalysis, dietaryGuidance, lifestyleTips] = await Promise.all([
        fetchGeminiResponse(doshaPrompt),
        fetchGeminiResponse(dietPrompt),
        fetchGeminiResponse(lifestylePrompt)
      ]);

      setSearchResults({
        doshaAnalysis,
        dietaryGuidance,
        lifestyleTips
      });
    } catch (error) {
      console.error('Error:', error);
      // Show error in markdown format
      setSearchResults({
        doshaAnalysis: '## Error\nUnable to analyze dosha at the moment. Please try again later.',
        dietaryGuidance: '## Error\nUnable to provide dietary guidance at the moment. Please try again later.',
        lifestyleTips: '## Error\nUnable to provide lifestyle tips at the moment. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ayurvedic-reports-section">
      <div className="container py-5">

        <div className="text-center mb-5">
          <h2 className="section-title">Personalized Ayurvedic Health Reports</h2>
          <p className="section-subtitle mb-5">
            Experience AI-driven analysis of your dosha (Vata, Pitta, Kapha) and receive personalized diet recommendations.
          </p>
          <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://media.istockphoto.com/id/173877738/photo/herbal-treatment.jpg?s=612x612&w=0&k=20&c=eu2OSQLQhhocN02tslGZVIKjJr-nhKj-dzDqPBPylPs="
              className="card-img-top"
              alt="Panchakarma Therapy"
            />
            <div className="card-body" style={{height: "250px"}}>
              <h5 className="card-title">Holistic Healing Approach</h5>
              <p className="card-text">
              Ayurveda, the ancient system of medicine, promotes a holistic approach to health by balancing the body, mind, and spirit. It relies on natural remedies, lifestyle modifications, and mindful living to enhance overall well-being.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://shadanga.com/cdn/shop/articles/panchakarma-a-holistic-approach-to-wellness-388327_1080x.jpg?v=1724546632"
              className="card-img-top"
              alt="Shirodhara Treatment"
            />
            <div className="card-body">
              <h5 className="card-title">Detoxification and Panchakarma</h5>
              <p className="card-text">
              Ayurvedic detox therapies, such as Panchakarma, remove accumulated toxins from the body. This cleansing process involves massages, steam therapy, and dietary changes to rejuvenate the body and boost immunity.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwT7NwLnEMUHgVKuGXAN6bcgLwgbTC9mz7cCjjBbct3XKzoi7_UFoWNqHDsda1ys4CkOk&usqp=CAU"
              className="card-img-top"
              alt="Ayurvedic Herbs and Spices"
            />
            <div className="card-body">
              <h5 className="card-title">Gut Health and Digestion</h5>
              <p className="card-text">
              Good digestion is considered the foundation of overall health in Ayurveda. A strong digestive fire (Agni) ensures proper nutrient absorption and toxin elimination, preventing illnesses and enhancing vitality.
              </p>
            </div>
          </div>
        </div>

     
      </div>
        </div>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Enter your health condition or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                disabled={loading}
              />
              <button type="submit" className="search-button" disabled={loading}>
                <Search size={20} />
                <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
          </form>
        </div>

        {searchResults && (
          <div className="results-container">
            <div className="results-grid">
              <div className="result-card dosha">
                <div className="markdown-content">
                  <ReactMarkdown>{searchResults.doshaAnalysis}</ReactMarkdown>
                </div>
              </div>
              
              <div className="result-card dietary">
                <div className="markdown-content">
                  <ReactMarkdown>{searchResults.dietaryGuidance}</ReactMarkdown>
                </div>
              </div>
              
              <div className="result-card lifestyle">
                <div className="markdown-content">
                  <ReactMarkdown>{searchResults.lifestyleTips}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AyurvedicHealthReports;