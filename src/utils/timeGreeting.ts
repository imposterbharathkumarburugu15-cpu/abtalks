export function getTimeGreeting(): { greeting: string; periodText: string; icon: string } {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return { greeting: "GOOD MORNING", periodText: "Early Builder Session", icon: "🌅" };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: "GOOD AFTERNOON", periodText: "Midday Ship Run", icon: "☀️" };
  } else if (hour >= 17 && hour < 22) {
    return { greeting: "GOOD EVENING", periodText: "Prime Time Build", icon: "🌆" };
  } else {
    return { greeting: "LATE NIGHT BUILD", periodText: "Midnight Code Session", icon: "🌙" };
  }
}
