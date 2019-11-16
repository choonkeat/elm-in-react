port module Counter exposing (..)

import Browser
import Browser.Events
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Json.Encode


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flags =
    { count : Int }


type alias Model =
    { mounted : Bool
    , count : Int
    }


type Msg
    = Unmount Json.Encode.Value
    | Increment
    | Decrement
    | WindowResize Int Int


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model True flags.count, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        _ =
            Debug.log "update" ( msg, model )
    in
    case msg of
        Unmount _ ->
            ( { model | mounted = False }, Cmd.none )

        Increment ->
            ( { model | count = model.count + 1 }, Cmd.none )

        Decrement ->
            ( { model | count = model.count - 1 }, Cmd.none )

        WindowResize w h ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model.count) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.mounted then
        Sub.batch
            [ unmount Unmount
            , Browser.Events.onResize WindowResize
            ]

    else
        -- Elm runtime should unmount listeners and not leak memory
        Sub.none


{-| Note: if we're not using any `Sub Msg` we don't actually need the unmount
-}
port unmount : (Json.Encode.Value -> msg) -> Sub msg
