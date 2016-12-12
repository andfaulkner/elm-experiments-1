---------------- IMPORTS ----------------
--import Html exposing (Html, div, text, program, h1, h2, span, input, li, ul, br, button)


module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


---------------------------------------------- MODEL -----------------------------------------------


model : { person : String }
model =
    { person = " world!" }



---------------------------------------------- UPDATE ----------------------------------------------
----------------------------------------------- VIEW -----------------------------------------------
--view : String -> Html a


view state =
    div []
        [ h2 []
            [ text ("Todo List For: " ++ state.person)
            ]
        , ul []
            [ li []
                [ text "Sample Todo Item"
                ]
            ]
        , input
            [ type_ "text"
            , placeholder "New Todo Item"
            ]
            []
        , button []
            [ text "Add Item"
            ]
        , br [] []
        , input
            [ type_ "text"
            , placeholder "Todo item to remove"
            ]
            []
        , button []
            [ text "Remove Item"
            ]
        ]



---------------- APP STARTING POINT ----------------


main : Html a
main =
    view model
