# Voice Notes App

## Description

An in-browser voice note application where a user can create, delete, and listen to voice notes.

## User stories

- [ ] As a user I can record and save voice notes
- [ ] As a user, after creating a voice note, I can name it
- [ ] As a user I can click the side panel voice note and I can play my voice note
- [ ] As a user, when I am not recording and no voice notes are selected the Voice Note dashboard is empty.
- [ ] As a user when I click the create button in the header, it will populate the dashboard with a record button
- [ ] As a user, when I click the record button, the dashboard background turns red and opacity fluctuates
- [ ] As a user, when I am recording, I can press a stop button to stop recording and a green play button replaces the red record button
- [ ] As a user, when I press play, the play button is replaced with the stop button
- [ ] As user when the voice note is playing I can press the stop button and it gets replaced with the play button.
- [ ] As a user I can click and x button and it asks me if I'm sure that I want to delete the recording
- [ ] As a user, I can click an x button on a voice note in the voice notes side panel and delete the voice note.

---

## Components:

- [ ] Header
- [ ] CreateButton
- [ ] DeleteButton
- [ ] PlayButton
- [ ] RecordButton
- [ ] StopButton
- [ ] Dashboard
- [ ] SidePanel
- [ ] SidePanelHeader
- [ ] VoiceNotes
- [ ] VoiceNote

---

## Component Details

### App

#### state:

- isRecording: bool
- isPlaying: bool
- isvoiceNoteSelected: bool

If all of the above are false then render the record button

The app component will hold the state of isRecording
The app component will hold the state of isPlaying
The app component will hold the state of voiceNoteSelected

This state will determine conditional rendering of button components in the dashboard

### Header

Header will contain a button to create new voice note

### Dashboard

Dashboard will conditionally render the record, play, and delete buttons depending on it's state

ex. On page load the dashboard should be empy and giving a user directions on how to create/record a voice note
scenario: When recording have stop button in dashboard
scenario: When playing have stop button in dashboard
scenario: When voice note selected, have play button in dashboard
scenario: On initial load state have directions in dashboard

### Side Panel

When I create a new voice note, a new list item gets added to the side panel
When I click a list item in the side panel it populates the dashboard with a play button

### Header

Stretch goals
When recording dashboard background color changes red
When playing background changes green
WHen deleting user is prompted if they are sure they want to delete

### Voice Note

Each individual voice note will have a click event on it that triggers inverse data flow state change in the app component
We have to track which voie not has been clicked and save that in the app components state
This means that every voice note component needs to have a unique id attached to it
Default state of clicked voice note should be null and when you click a voice note it should change the selectedVoiceNoteID to the one that has been clicked

### Storing Voice Notes

As far as storing voice notes goes, I think for the purpose of demonstration it woul dbe easier to store Blobs to IndexedDB and get/set the blobs using localforage. So when I click on a List Item in the side panel, on click I would be sending the id of that list item to query the voice not blob in storage. The localforage queries should be executed in each list item but most of the application state is in app and voice note data will render in the dashboard. So the click event will have to travel up from the ListItems, through the List, through the SidePanel and into the App component, add the current list item to a currentVoiceNoteState and travel down into the dashboard. This might be a good point to use Redux.

### Creating the actual audio

The audio will be created using a few different pieces. The first is we need an audio element, this will use the internal microphone on the device we are using this app with. Then we need to create and instance of MediaRecorder, call start on that instance, add an event listener to media recorder instance and ad event data to the audio chunks array, create a blob instance with the audio chunks and then create and audio url with URL.createObjectUrl(audioBlob) and then a new audio instance with that audio url. We will be using the play and stop methods on this audio instance.

### Playing the audio

In order to play the audio, I want to store the audio in the app state and whenever I click play button in the dashboard I a running play on the audio in state. There should only ever be audio in state if a voice note has been clicked. In order for us to query the correct audio file we have to store the uuid in the VoiceNote component and that needs to happen on creation.

### Deleting voice notes

I want to add a delete icon on every voice note that I create that removes that voice note from the db and from the dom. Each voice note item on the side panel will have a delete icon that has a click handler on it that sends and id up to the app state that removes the item with that id from the app state and also removes it from the db.

### Testing

_add stuff_
