"use client";

import Image from "next/image";
import { useMemo } from "react";
import { DateTime } from "luxon";
import styles from "@/app/styles/sportcardtable.module.css";

export default function SportTable({ games = [] }) {
  const formattedTimes = useMemo(() => {
    return games.map((game) => {
      const localTime = DateTime.fromISO(game.time).setZone(
        DateTime.local().zoneName
      );
      return localTime.toFormat("HH:mm");
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
            {
              games[0]?.status.length > 0 && <th>Status</th>
            }
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index} className={styles.tableRow}>
              <td>
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
              <td >
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
              <td >
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
              <td className={styles.scoreCell}>
                {game.showScore ? (
                  <span>
                    {game.teamAscore} - {game.teamBscore}
                  </span>
                ) : (
                  <span>VS</span>
                )}
              </td>
              <td >
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
              <td className={styles.leagueContainer}>
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
              </td>
              <td className={styles.timeCell}>[{formattedTimes[index]}]</td>
              {
                game.status.length > 0 && <td className={styles.statusCell}>{game.status || ""}</td>
              }
              <td className={styles.tipCell}>{game.tip || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
