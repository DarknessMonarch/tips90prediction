"use client";

import Image from "next/image";
import { useMemo } from "react";
import { formatTimeForDisplay  } from '@/app/utility/timezone';
import styles from "@/app/styles/sportcardtable.module.css";

export default function SportTable({ games = [] }) {
  const formattedTimes = useMemo(() => {
    return games.map((game) => {
      return formatTimeForDisplay(game.time, "HH:mm");
    });
  }, [games]);

  const getFormationColorClass = (formation) => {
    switch (formation) {
      case "W":
        return styles.win;
      case "D":
        return styles.draw;
      case "L":
        return styles.lose;
      default:
        return styles.defaultColor;
    }
  };

  const renderMobileFormations = (formationA, formationB) => {
    return (
      <div className={styles.mobileFormations}>
        {/* Team A formation */}
        <div className={styles.mobileFormationCol}>
          <div className={styles.formation}>
            {formationA &&
              formationA.map((result, idx) => (
                <div
                  key={idx}
                  className={`${
                    styles.formationCircle
                  } ${getFormationColorClass(result)}`}
                >
                  <span>{result.toUpperCase()}</span>
                </div>
              ))}
          </div>
        </div>
        
        {/* Team B formation */}
        <div className={styles.mobileFormationCol}>
          <div className={styles.formation}>
            {formationB &&
              formationB.map((result, idx) => (
                <div
                  key={idx}
                  className={`${
                    styles.formationCircle
                  } ${getFormationColorClass(result)}`}
                >
                  <span>{result.toUpperCase()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.sportsTable}>
        <thead>
          <tr>
            <th>League</th>
            <th>Team A</th>
            <th>Form</th>
            <th>Score</th>
            <th>Form</th>
            <th>Team B</th>
            <th>Time</th>
            {games[0]?.status.length > 0 && <th>Status</th>}
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index} className={styles.tableRow}>
              <td data-label="League">
                <div className={styles.leagueContainer}>
                  {game.leagueImage && (
                    <Image
                      src={game.leagueImage}
                      alt={`${game.league} image`}
                      width={25}
                      height={25}
                      priority={true}
                      className={styles.leagueImage}
                    />
                  )}
                  <span>{game.league}</span>
                </div>
              </td>
              <td data-label="Team A">
                <div className={styles.leagueContainer}>
                  {game.teamAImage && (
                    <Image
                      src={game.teamAImage}
                      alt={`${game.teamA} image`}
                      width={35}
                      height={35}
                      priority={true}
                      className={`${styles.teamImage} ${
                        game.sport === "Tennis" || game.sport === "Basketball"
                          ? styles.circularShape
                          : ""
                      }`}
                    />
                  )}
                  <span>{game.teamA}</span>
                </div>
              </td>
              <td data-label="Form A">
                <div className={styles.formation}>
                  {game.formationA &&
                    game.formationA.map((result, idx) => (
                      <div
                        key={idx}
                        className={`${
                          styles.formationCircle
                        } ${getFormationColorClass(result)}`}
                      >
                        <span>{result.toUpperCase()}</span>
                      </div>
                    ))}
                </div>
              </td>
              <td className={styles.scoreCell} data-label="Score">
                {game.showScore ? (
                  <span>
                    {game.teamAscore} - {game.teamBscore}
                  </span>
                ) : (
                  <span>VS</span>
                )}
              </td>
              <td data-label="Form B">
                <div className={styles.formation}>
                  {game.formationB &&
                    game.formationB.map((result, idx) => (
                      <div
                        key={idx}
                        className={`${
                          styles.formationCircle
                        } ${getFormationColorClass(result)}`}
                      >
                        <span>{result.toUpperCase()}</span>
                      </div>
                    ))}
                </div>
              </td>
              <td data-label="Team B">
                <div className={styles.leagueContainer}>
                  {game.teamBImage && (
                    <Image
                      src={game.teamBImage}
                      alt={`${game.teamB} image`}
                      width={35}
                      height={35}
                      priority={true}
                      className={`${styles.teamImage} ${
                        game.sport === "tennis" || game.sport === "basketball"
                          ? styles.circularShape
                          : ""
                      }`}
                    />
                  )}
                  <span>{game.teamB}</span>
                </div>
              </td>
              <td className={styles.timeCell} data-label="Time">[{formattedTimes[index]}]</td>
              {game.status.length > 0 && (
                <td className={styles.statusCell} data-label="Status">
                  <span>{game.status || ""}</span>
                </td>
              )}
              <td className={styles.tipCell} data-label="Tip">
                <span>{game.tip || ""}</span>
              </td>
              {renderMobileFormations(
                game.formationA, 
                game.formationB
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}