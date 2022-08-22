import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navi from "./src/navigation/Navigation"


const App = () => {

  return (
    <NavigationContainer>
      <Navi/>
    </NavigationContainer>
  );
}

export default App;