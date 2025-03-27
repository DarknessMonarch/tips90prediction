"use client";

import { toast } from "sonner";
import Image from "next/image";
import date from "date-and-time";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Nothing from "@/app/components/Nothing";
import LoadingLogo from "@/app/components/LoadingLogo";

import { GrAdd as AddIcon } from "react-icons/gr";
import { FiEdit as EditIcon } from "react-icons/fi";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";

import EmptySport from "@/public/assets/emptySport.png";
import styles from "@/app/styles/accounttable.module.css";

import { usePredictionStore } from "@/app/store/Prediction";

export default function VIPTable({ sport }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { 
    predictions, 
    fetchPredictions, 
    deletePrediction, 
    loading 
  } = usePredictionStore();
  
  const [filteredPredictions, setFilteredPredictions] = useState([]);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const currentDate = new Date().toISOString().split("T")[0];
  const dateKey = searchParams.get("date") || currentDate;

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("date", selectedDate);
    router.replace(`${pathname}?${urlParams.toString()}`);
  };

  const handleDelete = async (id) => {
    if (isDeleting) return;
    
    if (window.confirm("Are you sure you want to delete this prediction?")) {
      setIsDeleting(true);
      try {
        const result = await deletePrediction(id);
        if (result.success) {
          toast.success("Prediction deleted successfully");
        } else {
          toast.error(result.message || "Failed to delete prediction");
        }
      } catch (error) {
        console.error("Error deleting prediction:", error);
        toast.error("An error occurred while deleting the prediction");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (id) => {
    setUserId(id);
    router.push(`dashboard/${sport}?form=Edit&id=${id}`, { scroll: false });
  };

  const handleAddTeam = () => {
    router.push(`dashboard/${sport}?form=Add`, { scroll: false });
  };

  // Load predictions on mount and when dependencies change
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        await fetchPredictions(dateKey, sport);
        setHasAttemptedLoad(true);
      } catch (error) {
        console.error("Error loading predictions:", error);
        setHasAttemptedLoad(true);
        toast.error("Failed to load predictions");
      }
    };

    if (dateKey && sport) {
      loadPredictions();
    }
  }, [dateKey, sport, fetchPredictions]);

  // Sort predictions by time when predictions array changes
  useEffect(() => {
    if (!Array.isArray(predictions)) {
      setFilteredPredictions([]);
      return;
    }

    const sortedPredictions = [...predictions].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    setFilteredPredictions(sortedPredictions);
  }, [predictions]);

  // Render team with image
  const renderTeamWithImage = (team, image, sportType) => (
    <div className={styles.teamInner}>
      <Image
        src={image}
        alt={`${team} image`}
        priority={true}
        width={30}
        height={30}
        className={`${styles.teamImage} ${
          sportType === "Tennis" || sportType === "Basketball" 
            ? styles.circularShape 
            : ""
        }`}
      />
 <span className={styles.teamName}>{team}</span>
    </div>
  );

  // Render table rows
  const renderTableContent = () => {
    return filteredPredictions.map((prediction) => (
      <tr key={prediction._id} className={styles.tableRow}>
        <td>
          {renderTeamWithImage(prediction.league, prediction.leagueImage)}
        </td>
        <td>
          {renderTeamWithImage(prediction.teamA, prediction.teamAImage, prediction.sport)}
        </td>
        <td>
          {renderTeamWithImage(prediction.teamB, prediction.teamBImage, prediction.sport)}
        </td>
        <td>
          {prediction.showScore
            ? `${prediction.teamAscore} - ${prediction.teamBscore}`
            : "VS"}
        </td>
        <td>{date.format(new Date(prediction.time), "HH:mm")}</td>
        <td>{prediction.status || "-"}</td>
        <td>{prediction.tip}</td>
        <td>
          <EditIcon
            onClick={() => handleEdit(prediction._id)}
            aria-label="edit data"
            className={styles.editIcon}
          />
        </td>
        <td>
          <DeleteIcon
            onClick={() => handleDelete(prediction._id)}
            aria-label="delete data"
            className={styles.deleteIcon}
          />
        </td>
      </tr>
    ));
  };

  // Show loading state
  if (loading) {
    return (
      <div className={styles.notLoading}>
        <LoadingLogo />
      </div>
    );
  }

  return (
    <div className={styles.dataContainer}>
      {/* Table header with actions */}
      <div className={styles.tableHeader}>
        <div className={styles.addContainer} onClick={handleAddTeam}>
          <AddIcon aria-label="add data" className={styles.copyIcon} />
          Add Team
        </div>
        <input
          type="date"
          className={styles.dateInput}
          onChange={handleDateChange}
          value={dateKey}
        />
      </div>

      {/* Empty state or table */}
      {!filteredPredictions || filteredPredictions.length === 0 ? (
        <Nothing
          Alt="No vip prediction"
          NothingImage={EmptySport}
          Text="No vip predictions available for this date"
        />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.sportsTable}>
            <thead>
              <tr>
                <th>League</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Score</th>
                <th>Time</th>
                <th>Status</th>
                <th>Tip</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}