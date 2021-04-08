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

state:
isRecording: bool
isPlaying: bool
isvoiceNoteSelected: bool

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

---

### Testing

_add stuff_
