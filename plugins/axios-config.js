export default function({ $axios, redirect, env }) {
  $axios.onRequest(config => {
    config.headers.common["Authorization"] = `Bearer ${env.GITHUB_TOKEN}`;
  });
  $axios.onError(error => {
    if (error.message.toLowerCase() == "network error") {
      redirect("/no-network");
    }
  });
}
