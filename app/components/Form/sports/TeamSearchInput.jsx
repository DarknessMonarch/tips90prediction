"use client";

import { useState, useEffect } from "react";
import Loader from "@/app/components/StateLoader";
import styles from "@/app/styles/form.module.css";
import { useSportStore } from "@/app/store/SportApi";

const TeamSearchInput = ({ 
    label, 
    value, 
    onChange, 
    onSearchResult, 
    name, 
    required = true, 
    title,
    error 
  }) => {
    const { sports, footballPredictions, fetchSports, fetchFootballPredictions, getDataByType } = useSportStore();
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const initializeData = async () => {
        setIsLoading(true);
        try {
          // Determine which data to load based on sport type
          const sportType = title?.toLowerCase() || "";
          const isFootball = ["football", "banker", "straight", "winning"].includes(sportType);
          
          if (isFootball && footballPredictions.length === 0) {
            await fetchFootballPredictions();
          } else if (!isFootball && sports.length === 0) {
            await fetchSports();
          }
        } catch (error) {
          console.error("Error loading data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      initializeData();
    }, [title, fetchFootballPredictions, fetchSports, sports.length, footballPredictions.length]);
  
    const handleSearch = (searchValue) => {
      onChange({ target: { name, value: searchValue } });
      if (searchValue.length < 2) {
        setSearchResults([]);
        return;
      }
  
      setIsSearching(true);
      const searchTerm = searchValue.toLowerCase();
      
      // Determine which data source to use based on sport type
      const sportType = title?.toLowerCase() || "";
      const isFootball = ["football", "banker", "straight", "winning"].includes(sportType);
      
      // Get the appropriate data
      let data = isFootball ? footballPredictions : sports;
      
      // If not football, filter by sport title
      if (!isFootball && sportType !== "vip") {
        data = data.filter(item => item.sport.toLowerCase() === sportType);
      }
      
      let results = [];
      
      if (name === 'league') {
        // Handle league search
        results = data
          .filter((item, index, self) => {
            const league = item.league?.toLowerCase() || "";
            // Only include unique leagues that match the search term
            return league.includes(searchTerm) && 
                  self.findIndex(t => (t.league?.toLowerCase() || "") === league) === index;
          })
          .map(item => ({
            league: item.league,
            leagueIcon: item.leagueIcon
          }));
      } else {
        // Handle team search
        const searchByTeam = name === 'teamA' ? 'teamA' : 'teamB';
        
        results = data
          .filter(item => {
            const teamA = item._id?.teamA?.toLowerCase() || item.teamA?.toLowerCase() || "";
            const teamB = item._id?.teamB?.toLowerCase() || item.teamB?.toLowerCase() || "";
            return teamA.includes(searchTerm) || teamB.includes(searchTerm);
          })
          .flatMap(item => {
            const teams = [];
            const teamAName = item._id?.teamA || item.teamA || "";
            const teamBName = item._id?.teamB || item.teamB || "";
            
            if (searchByTeam === 'teamA' && teamAName.toLowerCase().includes(searchTerm)) {
              teams.push({
                team: teamAName,
                league: item.league,
                teamIcon: item.teamAIcon,
                leagueIcon: item.leagueIcon,
                isTeamA: true
              });
            }
            if (searchByTeam === 'teamB' && teamBName.toLowerCase().includes(searchTerm)) {
              teams.push({
                team: teamBName,
                league: item.league,
                teamIcon: item.teamBIcon,
                leagueIcon: item.leagueIcon,
                isTeamA: false
              });
            }
            return teams;
          });
      }
  
      // Filter to unique results and limit to 5
      results = results
        .filter((item, index, self) => 
          index === self.findIndex((t) => 
            (item.team ? item.team === t.team : item.league === t.league)
          )
        )
        .slice(0, 5);
  
      setSearchResults(results);
      setIsSearching(false);
    };
  
    const handleSelect = (result) => {
      if (name === 'league') {
        onChange({ target: { name, value: result.league } });
        onSearchResult({
          league: result.league,
          leagueIcon: result.leagueIcon
        });
      } else {
        onChange({ target: { name, value: result.team } });
        onSearchResult({
          team: result.team,
          league: result.league,
          teamIcon: result.teamIcon,
          leagueIcon: result.leagueIcon,
          isTeamA: result.isTeamA
        });
      }
      setSearchResults([]);
    };
  
    return (
      <div className={styles.formTeamContainer}>
        <label>{label} {required && <span className={styles.required}>*</span>}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          className={`${styles.inputField} ${error ? styles.errorInput : ''}`}
          placeholder={`Search ${label}`}
          disabled={isLoading}
        />
        {isLoading && <span className={styles.loadingIndicator}><Loader /></span>}
        {error && <span className={styles.errorText}>{error}</span>}
        {searchResults.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.map((result, index) => (
              <span
                key={index}
                className={styles.searchResultItem}
                onClick={() => handleSelect(result)}
              >
                {name === 'league' ? result.league : result.team}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };
export default TeamSearchInput;