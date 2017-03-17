class StateController < ApplicationController
  respond_to :json

  def set
    state = State.first_or_create()
    state.update(name: params[:name], task_id: params[:task_id])
    respond_with state
  end

  def get
    respond_with State.first
  end
end
