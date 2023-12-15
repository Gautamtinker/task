import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
function NextPage() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [set, setCards1] = useState(0);
  const handleAddCard = () => {
    const newCard = {
      id: new Date().getTime(),
      list: set + 1, // Initialize list for each card
      checkboxes: [],
    };
    setCards1(set + 1);

    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleAddCheckbox = (cardId) => {
    const userLabel = window.prompt("Enter label for the new checkbox:");

    if (userLabel !== null) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                checkboxes: [
                  ...card.checkboxes,
                  { label: userLabel, checked: true },
                ],
              }
            : card
        )
      );
    }
  };
  const logout = ({ onLoginSuccess }) => {
    onLoginSuccess();
    navigate("/");
  };
  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>Welcome User</Typography>
        </CardContent>
        <Button sx={{ marginLeft: 130 }} onClick={logout}>
          Logout
        </Button>
      </Card>
      <Draggable>
        <Card
          sx={{
            backgroundColor: "aqua",
            height: 540,
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Card
            sx={{
              backgroundColor: "white",
              height: 150,
              width: 200,
              margin: 10,
              display: "inline-block",
            }}
          >
            <Card
              sx={{
                backgroundColor: "white",
                height: 40,
                width: 200,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ color: "black", fontSize: 15, fontWeight: "bold" }}
                >
                  Create new list
                </Typography>
              </CardContent>
            </Card>
            <AddIcon
              sx={{
                fontSize: 80,
                width: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleAddCard}
            />
          </Card>
          {cards.map((card) => (
            <Card
              key={card.id}
              sx={{
                backgroundColor: "white",
                height: 250,
                width: 240,
                margin: 10,
                display: "inline-block",
                overflow: "auto",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "white",
                  height: 40,
                  width: 240,
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ color: "black", fontSize: 15, fontWeight: "bold" }}
                  >
                    {`List ${card.list}`}
                  </Typography>
                </CardContent>
              </Card>
              {card.checkboxes.map((checkbox, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox defaultChecked={checkbox.checked} />}
                  label={checkbox.label}
                  sx={{ display: "block" }}
                />
              ))}
              <AddIcon
                onClick={() => handleAddCheckbox(card.id)}
                sx={{
                  fontSize: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Card>
          ))}
        </Card>
      </Draggable>
    </div>
  );
}

export default NextPage;
