import React from "react";
import { Button } from "react-native-paper";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";

import MovieCard from "./MovieCard";

const MovieList = (props) => {
  let {
    films,
    loadingMovies,
    getAllMovies,
    genres,
    goBack,
    pageNr,
    total_pages,
    filteredResults,
    searchInput,
  } = props;

  return (
    <SafeAreaView
      style={{ flex: 1, height: "100%", marginBottom: 50, paddingBottom: -20 }}
    >
      <ScrollView>
        {searchInput.length > 1
          ? filteredResults.map((film, index) => {
              return (
                <View key={film.id}>
                  <MovieCard
                    title={film.title}
                    backdrop_path={film.backdrop_path}
                    vote_average={film.vote_average}
                    film={film}
                    genres={genres}
                  />
                </View>
              );
            })
          : films.map((film, index) => {
              return (
                <View key={film.id}>
                  <MovieCard
                    title={film.title}
                    backdrop_path={film.backdrop_path}
                    vote_average={film.vote_average}
                    film={film}
                    genres={genres}
                  />
                </View>
              );
            })}
        {loadingMovies && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ padding: 20 }}
          />
        )}
        <View style={[styles.container]}>
          <Button
            onPress={goBack}
            style={[styles.button, { backgroundColor: "#345eef" }]}
          >
            <Text style={styles.btnColor}>Go Back</Text>
          </Button>
          <Button
            onPress={async () => {
              await getAllMovies();
            }}
            disabled={pageNr - 1 === total_pages ? true : false}
            style={[
              styles.button,
              {
                backgroundColor:
                  pageNr - 1 === total_pages ? "#dddddd" : "#345eef",
              },
            ]}
          >
            <Text
              style={{ color: pageNr - 1 === total_pages ? "grey" : "white" }}
            >
              Load More
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: "47%",
  },
  btnColor: {
    color: "white",
  },
});

export default MovieList;
