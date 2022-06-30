import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

export const convertMonth = (month) => {
	switch (month) {
		case 0:
			return "Janeiro";
		case 1:
			return "Fevereiro";
		case 2:
			return "Março";
		case 3:
			return "Abril";
		case 4:
			return "Maio";
		case 5:
			return "Junho";
		case 6:
			return "Julho";
		case 7:
			return "Agosto";
		case 8:
			return "Setembro";
		case 9:
			return "Outubro";
		case 10:
			return "Novembro";
		case 11:
			return "Dezembro";
	}
};

export const convertDayOfWeek = (day) => {
	switch (day) {
		case 0:
			return "Domingo";
		case 1:
			return "Segunda-feira";
		case 2:
			return "Terça-feira";
		case 3:
			return "Quarta-feira";
		case 4:
			return "Quinta-feira";
		case 5:
			return "Sexta-feira";
		case 6:
			return "Sábado";
	}
};

const Calendar = (props) => {
	const backgroundColor = props?.backgroundColor;
	const selectedColor = props?.color || "#c2dbf8";
	const selectedDate = new Date(props?.date);
	const [actualDate, setActualDate] = useState(selectedDate);
	const { onChange, setDate, style, daysToNotify } = props;
	const daysOfWeek = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sab."];

	const navigate = useNavigate();

	const getDaysOfMounth = () => {
		let days = [[], [], [], [], [], []];
		let fristDay = new Date(actualDate.getFullYear(), actualDate.getMonth(), 1);
		let lastDay = new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 0).getDate();

		let j = 0;

		for (var i = 0; i < fristDay.getDay(); i++) {
			days[j].push(null);
			if (days[j].length == 7 && j < 5) {
				j++;
			}
		}

		for (var i = 1; i <= lastDay; i++) {
			days[j].push(i);
			if (days[j].length == 7 && j < 5) {
				j++;
			}
		}

		const remainingLength = 42 - lastDay - fristDay.getDay();

		for (var i = 0; i < remainingLength; i++) {
			days[j].push(null);
			if (days[j].length == 7 && j < 5) {
				j++;
			}
		}

		return days;
	};

	const [daysOfMonth, setDaysOfMonth] = useState([]);

	const nextMonth = () => {
		if (actualDate.getMonth() == 11) {
			setActualDate(new Date(actualDate.getFullYear() + 1, 0, 1));
		} else {
			setActualDate(new Date(actualDate.getFullYear(), actualDate.getMonth() + 1, 1));
		}
	};

	const prevMonth = () => {
		if (actualDate.getMonth() == 0) {
			setActualDate(new Date(actualDate.getFullYear() - 1, 11, 1));
		} else {
			setActualDate(new Date(actualDate.getFullYear(), actualDate.getMonth() - 1, 1));
		}
	};

	useEffect(() => {
		setDaysOfMonth(getDaysOfMounth(actualDate.getMonth()));
	}, [actualDate]);

	const haveNotificationTo = (day) => {
		for (let i = 0; i < daysToNotify.length; i++) {
			let notifyDate = new Date(daysToNotify[i]);
			if (
				notifyDate.getDate() + 1 == day &&
				notifyDate.getMonth() == actualDate.getMonth() &&
				notifyDate.getFullYear() == actualDate.getFullYear()
			) {
				return true;
			}
		}
		return false;
	};

	return (
		<div style={style}>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div>
					<div
						style={{
							backgroundColor: backgroundColor,
						}}>
						<div style={{ display: "flex", justifyContent: "space-around", }}>
							<Button
								onClick={prevMonth}
								style={{
									color: selectedColor,
									borderRadius: "100%",
									padding: "40px 40px",
									justifyContent: "center",
								}}>
								<ArrowBackIos
									style={{
										color: "#3689ea",
										transform: "scale(3)",
										position: "relative",
										left: "11px",
									}}></ArrowBackIos>
							</Button>

							<Typography
								style={{
									color: "darkgray",
									textAlign: "center",
									fontSize: "80px",
									padding: "20px 0",
								}}>
								{`${convertMonth(actualDate.getMonth())} ${actualDate.getFullYear()}`}
							</Typography>
							<Button
								onClick={nextMonth}
								style={{
									color: selectedColor,
									borderRadius: "100%",
									padding: "40px 40px",
								}}>
								<ArrowForwardIos
									style={{
										color: "#3689ea",
										transform: "scale(3)",
									}}></ArrowForwardIos>
							</Button>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
							}}>
							{daysOfWeek.map((day) => {
								return (
									<Typography
										style={{
											color: "lightgray",
											fontSize: "50px",
											padding: "20px",
										}}>
										{day}
									</Typography>
								);
							})}
						</div>
					</div>
					<div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
						<div style={{ height: "600px" }}>
							{daysOfMonth.map((week) => {
								return (
									<div style={{ display: "flex", justifyContent: "center",marginTop:"40px" }}>
										{week.map((day) => {
											return (
												<>
													<Typography
														onClick={() => {
															if (day != null) {
																setDate(new Date(actualDate.getFullYear(), actualDate.getMonth(), day));
																onChange();
															}
														}}
														style={{
															width: "50px",
															color:
																selectedDate.getDate() == day &&
																selectedDate.getMonth() == actualDate.getMonth() &&
																selectedDate.getFullYear() == actualDate.getFullYear()
																	? "#3689ea"
																	: "darkgray",
															fontSize: "40px",
															padding: "10px 15px",
															margin: "10px 31px",
															textAlign: "center",
															backgroundColor:
																selectedDate.getDate() == day &&
																selectedDate.getMonth() == actualDate.getMonth() &&
																selectedDate.getFullYear() == actualDate.getFullYear()
																	? selectedColor
																	: "transparent",
															borderRadius: "45px",
														}}>
														{day}
													</Typography>
													{daysToNotify?.length > 0 && haveNotificationTo(day) && (
														<div
															style={{
																backgroundColor: "#3689ea",
																width: "10px",
																height: "10px",
																borderRadius: "30px",
																position: "relative",
																top: "70px",
																right: "76px",
															}}></div>
													)}
												</>
											);
										})}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Calendar;
