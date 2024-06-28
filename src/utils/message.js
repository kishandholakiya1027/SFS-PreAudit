export function convertMessages(messages) {
  const groupedMessages = {};

  messages.forEach((message) => {
    const date = new Date(message.createdAt).toISOString().split("T")[0];
    const time = new Date(message.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }

    groupedMessages[date].push({
      time: time,
      message: message.message,
      isView: message.isView,
    });
  });

  const formattedMessages = Object.keys(groupedMessages).map((date) => ({
    date: date.split("-").reverse().join("-"),
    list: groupedMessages[date],
  }));

  return formattedMessages;
}
