const StoryViewer = ({viewStory, setViewStory}) => {
  return (
    <div className="view-story-container" style={{backgroundColor: viewStory.media_type === "text" ? viewStory.bg_clr : '#000000'}}>
        {/* Progress Bar */}
        <div className="progress-bar">
            <div className="progress-line" style={{width: '50'}}>

            </div>
        </div>
    </div>
  )
}
export default StoryViewer