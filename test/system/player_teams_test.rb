require "application_system_test_case"

class PlayerTeamsTest < ApplicationSystemTestCase
  setup do
    @player_team = player_teams(:one)
  end

  test "visiting the index" do
    visit player_teams_url
    assert_selector "h1", text: "Player Teams"
  end

  test "creating a Player team" do
    visit player_teams_url
    click_on "New Player Team"

    fill_in "League", with: @player_team.league_id
    fill_in "Name", with: @player_team.name
    fill_in "Roster", with: @player_team.roster
    fill_in "User", with: @player_team.user_id
    click_on "Create Player team"

    assert_text "Player team was successfully created"
    click_on "Back"
  end

  test "updating a Player team" do
    visit player_teams_url
    click_on "Edit", match: :first

    fill_in "League", with: @player_team.league_id
    fill_in "Name", with: @player_team.name
    fill_in "Roster", with: @player_team.roster
    fill_in "User", with: @player_team.user_id
    click_on "Update Player team"

    assert_text "Player team was successfully updated"
    click_on "Back"
  end

  test "destroying a Player team" do
    visit player_teams_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Player team was successfully destroyed"
  end
end
