import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";

import "./global.css";

import styles from "./App.module.css";

export function App() {
  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <Tasks />
      </main>
    </div>
  );
}
