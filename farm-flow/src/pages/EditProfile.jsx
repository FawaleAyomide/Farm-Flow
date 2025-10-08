import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RiMore2Line } from "react-icons/ri";
import displayImg from "../Images/displayImg.svg";
import "../Style/profile.css";

const EditProfile = () => {
  const [search, setSearch] = useState("");
  const [nationality, setNationality] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-profile">
      <div className="profile-wrapper">
        <div className="head">
          <RiArrowLeftLine
            size={25}
            className="arrow-left-icon"
            onClick={handleBack}
          />
          <h1>User Profile</h1>
          <RiMore2Line size={25} className="arrow-left-icon" />
        </div>
        <div className="user-details">
          <img
            src={displayImg}
            alt="user-img"
            width="160"
            height="160"
            className="display-img"
          />
          <div className="middle-content">
            <div className="text-wrapper">
              <h1>
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "User"}
              </h1>
              <p>{user?.email || "No email available"}</p>
            </div>
          </div>
          <form
            className="profile-form"
            // onSubmit={handleSubmit}
          >
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="email"
                placeholder={`${user?.firstName || "First"} ${user?.lastName || "Last"}`}
                //   value={form.email}
                //   onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="username">Phone Number</label>
              <input
                type="email"
                name="email"
                placeholder="+234 000 0000 000"
                //   value={form.email}
                //   onChange={handleChange}
              />
            </div>
            <div className="name-fields">
              <div className="username-wrapper">
                <div className="input-wrapper">
                  <label htmlFor="firstname">Location</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="City"
                    //   value={form.firstName}
                    //   onChange={handleChange}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="State"
                    //   value={form.lastName}
                    //   onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="password-wrapper">
              <div className="input-wrapper">
                <label htmlFor="username">Nationality</label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className=""
                >
                  <option value="">-- Select Country --</option>
                  {filteredCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div
                type="button"
                className="toggle-password"
                //   onClick={() => setShowPassword(!showPassword)}
              ></div>
            </div>

            <div className="password-wrapper">
              <div className="input-wrapper">
                <label htmlFor="username">Farmer's Bio</label>
                <textarea
                  // type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=""
                />
                <div type="button" className="toggle-password"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
