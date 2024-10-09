import React , { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Trie from "./search.jsx";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

import './footer1.css'; 
import Card from "@mui/material/Card";


const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",
  fontSize: "20px",
  marginLeft: "50px",
};


const textStyle1 = {
  ...textStyle,
  fontSize: "15px",
  marginLeft: "20px",
  marginTop: "-5px",
};
const cardStylessubj = {
  width: 883,
  height: 90,
  left: "100px",
  marginLeft: 5, 
  marginTop: 3, 
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  zIndex: 8,
};

function toLowerCaseGreek(text) {
    const greekCharsMap = {
      Α: 'α', Β: 'β', Γ: 'γ',
      Δ: 'δ', Ε: 'ε', Ζ: 'ζ', Η: 'η', Θ: 'θ',
      Ι: 'ι', Κ: 'κ', Λ: 'λ', Μ: 'μ', Ν: 'ν',
      Ξ: 'ξ', Ο: 'ο', Π: 'π', Ρ: 'ρ', Σ: 'σ',
      Τ: 'τ', Υ: 'υ', Φ: 'φ', Χ: 'χ', Ψ: 'ψ',
      Ω: 'ω', Ά: 'ά', Έ: 'έ', Ί: 'ί', Ό: 'ό',
      Ύ: 'ύ', Ή: 'ή', Ώ: 'ώ'
    };
  
    return text.replace(/./g, c => greekCharsMap[c] || c).toLowerCase();
  }

const Search = ({ flag,setsubj ,isEnrolled,checkedItems,semester,id}) => {
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(''); //pairnw to string
    const [suggestions, setSuggestions] = useState([]); //pairno to array
    const trie = new Trie();
    if(flag==0 || flag==2){
    const items = [
      "Πρακτική Ι",
      "Πρακτική ΙΙ",
      "Πτυχιακή Ι",
      "Πτυχιακή ΙΙ",
      "Ανάλυση I",
      "Δομές Δεδομένων και Τεχνικές Προγραμματισμού",
      "Αρχιτεκτονική Υπολογιστών",
      "Δίκτυα Επικοινωνιών I",
      "Εργαστήριο Δικτύων Επικοινωνιών I",
      "Σχεδίαση και Χρήση Βάσεων Δεδομένων",
      "Θεωρία Υπολογισμού",
      "Μουσική Πληροφορική",
      "Μεταγλωττιστές",
      "Προστασία και Ασφάλεια",
      "Λογικός Προγραμματισμός",
      "Τεχνολογίες Εφαρμογών Διαδικτύου",
      "Εφαρμοσμένα Μαθηματικά",
      "Ασύρματα Δίκτυα Αισθητήρων"

  ];
  items.forEach(item => trie.insert(item));}
  if(flag==0 || flag==3){
    const items2 = [
      "Εργαστήριο Λογικής Σχεδίασης",
      "Εισαγωγή στην Πληροφορική και στις Τηλεπικοινωνίες",
      "Αρχές Γλωσσών Προγραμματισμού",
      "Γραμμική Άλγεβρα",
      "Εισαγωγή στον Προγραμματισμό",
      "Ανάλυση II",
      "Διακριτά Μαθηματικά",
      "Αντικειμενοστραφής",
      "Εργαστήριο Κυκλωμάτων και Συστημάτων",
      "Αριθμητική Ανάλυση",
      "Υλοποίηση Συστημάτων Βάσεων Δεδομένων",
      "Λειτουργικά Συστήματα",
      "Επικοινωνία Ανθρώπου Μηχανής",
      "Αρχιτεκτονική Υπολογιστών ΙΙ",
      "Ψηφιακή Επεξεργασία Σήματος",
      "Δίκτυα Επικοινωνιών ΙΙ",
      "Ανάπτυξη Λογισμικού για Συστήματα Δικτύων και Τηλεπικοινωνιών",
      "Προηγμένα Θέματα Αλγορίθμων",
      "Ανάπτυξη Λογισμικού για Αλγοριθμικά Προβλήματα"
  ];

  items2.forEach(item => trie.insert(item));}

    const handleInputChange = (event) => { // allazei to input
        const input = event.target.value; 
        setSearchTerm(input); //setaro to search term ws input
        if (input.trim() === '') { 
          setSuggestions([]);
          return;
        }
        console.log(toLowerCaseGreek(input));
        const foundWords = trie.find(input);
        console.log(foundWords)
        setSuggestions(foundWords);
      };
    
      const handleSearchClick = async() => {
        
        
        console.log('Search term:', searchTerm);
        try{
        const response1 = await axios.post('http://127.0.0.1:5000/search', { searchTerm });
            
  
          if (
              !response1.data ||
              !response1.data.class ||
              response1.data.class.length === 0){
              
              setsubj(null);
            }
            else{
              if(isEnrolled!=false){
                navigate(`/this_class/${response1.data.class[0].Name}/${response1.data.class[0].Class_ID}`);
              }
              else{
                // navigate(`/enrollement/theo`);
                var jsonString = JSON.stringify(response1.data.class[0]);
                var check= JSON.stringify(checkedItems);
                var sem= JSON.stringify(semester);

              // Store the JSON string in localStorage under a specific key
                localStorage.setItem('subj', jsonString);
                localStorage.setItem(`${id}`, check);
                localStorage.setItem('semester', sem);
                console.log("id",id)
                navigate(`/enrollement/${id}/${response1.data.class[0].Class_ID}`);
              }
              setsubj(response1.data.class[0]);

              
            }
       
        setSearchTerm(''); // kano to search term mhdeniko string
        setSuggestions([]); // kano ta suggestions mhdeniak
          }
          catch (error) {

          }
      };
    
      const handleSuggestionClick = (suggestion) => {
      
        console.log('Selected suggestion:', suggestion);
       
        setSearchTerm(suggestion);
        setSuggestions([]); 
        // navigate(`/${suggestion}`);
        
      };
      
   
    return (
    <div className="group-67 elevation rectangle-7">
      <div >
        <TextField fullWidth
  
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Αναζήτηση Μαθημάτων "
          variant="standard" 
          style={{ width: "940px",top : "10px",left: "20px"}}
          InputProps={{
            disableUnderline: true
          }}
  
        />
        
      
        <SearchIcon
        onClick={handleSearchClick}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '12px', 
          right: '15px', 
         
        }}
      />
        </div>

        {suggestions.length > 0 && (
        <div className="suggestion-box">
          <ul>
            
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer' }}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default Search;