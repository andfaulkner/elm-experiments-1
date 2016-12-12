--------------------------------------------- IMPORTS ----------------------------------------------
--import Html exposing (Html, div, text, program, h1, h2, span, input, li, ul, br, button)


module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


----------------------------------------------- MAIN -----------------------------------------------


main =
    Html.beginnerProgram
        { model = model
        , view = view
        , update = update
        }



---------------------------------------------- MODEL -----------------------------------------------


type alias Model =
    Int


model : Int
model =
    0



---------------------------------------------- UPDATE ----------------------------------------------


type Msg
    = Increment
    | Decrement
    | PlusTwo
    | MinusTwo
    | ResetCounter


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1

        PlusTwo ->
            model + 2

        MinusTwo ->
            model - 2

        ResetCounter ->
            0



----------------------------------------------- VIEW -----------------------------------------------
--view : String -> Html a


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text (toString model) ]
        , div [] []
        , button [ onClick MinusTwo ] [ text "-2" ]
        , button [ onClick Decrement ] [ text "-" ]
        , button [ onClick ResetCounter ] [ text "Reset" ]
        , button [ onClick Increment ] [ text "+" ]
        , button [ onClick PlusTwo ] [ text "+2" ]
        ]
